from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import pickle
from tensorflow.keras.models import load_model
import os

app = FastAPI(title="ISL Gesture ML Service", version="1.0")

MODEL_PATH = "../isl_sign_language_model.h5"
LABEL_MAP_PATH = "../isl_label_map.pkl"
SEQ_LEN = 20  # Should match model input

# Load model and label map at startup
try:
    model = load_model(MODEL_PATH)
    with open(LABEL_MAP_PATH, "rb") as f:
        label_map = pickle.load(f)
    actions = np.array([label for label, idx in sorted(label_map.items(), key=lambda x: x[1])])
except Exception as e:
    print(f"Error loading model or label map: {e}")
    model = None
    actions = np.array([])

class KeypointsRequest(BaseModel):
    keypoints: list  # List of SEQ_LEN arrays, each array is 1662 floats

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predict")
def predict_gesture(data: KeypointsRequest):
    # Log received keypoints for debugging
    keypoints_seq = np.array(data.keypoints)
    print(f"Received keypoints shape: {keypoints_seq.shape}")
    if keypoints_seq.shape[0] > 0:
        print(f"First row sample: {keypoints_seq[0][:10]}")
    print(f"Keypoints stats: min={np.min(keypoints_seq):.4f}, max={np.max(keypoints_seq):.4f}, mean={np.mean(keypoints_seq):.4f}, std={np.std(keypoints_seq):.4f}")
    if np.std(keypoints_seq) < 0.01:
        print("[Warning] Keypoints have very low variance. Are you sending random or static data?")
    if model is None or len(actions) == 0:
        raise HTTPException(status_code=500, detail="Model or label map not loaded.")
    if keypoints_seq.shape != (SEQ_LEN, 1662):
        raise HTTPException(status_code=400, detail=f"Input shape must be ({SEQ_LEN}, 1662)")
    input_data = np.expand_dims(keypoints_seq, axis=0).astype(np.float32)
    prediction = model.predict(input_data, verbose=0)
    pred_idx = int(np.argmax(prediction))
    confidence = float(np.max(prediction))
    gesture = actions[pred_idx] if pred_idx < len(actions) else "Unknown"
    print(f"Predicted gesture: {gesture}, confidence: {confidence:.4f}")
    return {
        "gesture": gesture,
        "confidence": confidence,
        "pred_idx": pred_idx,
        "actions": actions.tolist()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=False)
