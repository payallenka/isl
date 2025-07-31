# ISL Gesture ML Service

This project provides a FastAPI-based machine learning service for recognizing Indian Sign Language (ISL) gestures from keypoint data.

## Prerequisites

- Python 3.8+
- [pip](https://pip.pypa.io/en/stable/)
- (Recommended) Virtual environment

## Setup Instructions

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repo-url>
   cd <repo-directory>
   ```

2. **Create and activate a virtual environment** (optional but recommended):
   ```bash
   python3 -m venv env
   source env/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install fastapi uvicorn tensorflow numpy pydantic
   ```
   - If you have a `requirements.txt`, use:
     ```bash
     pip install -r requirements.txt
     ```

4. **Ensure model and label map files are present:**
   - Place `isl_sign_language_model.h5` and `isl_label_map.pkl` in the project root directory (or update their paths in `main.py` if needed).

5. **Run the FastAPI service:**
   ```bash
   cd ml_service
   python main.py
   ```
   - The service will start at `http://0.0.0.0:8000`

## API Endpoints

### Health Check
- **GET** `/health`
- Returns: `{ "status": "ok" }`

### Predict Gesture
- **POST** `/predict`
- Request body (JSON):
  ```json
  {
    "keypoints": [[...], [...], ...]  // List of 20 arrays, each with 1662 floats
  }
  ```
- Response:
  ```json
  {
    "gesture": "<predicted_label>",
    "confidence": <float>,
    "pred_idx": <int>,
    "actions": ["label1", "label2", ...]
  }
  ```

#### Example: Test with curl and sample_keypoints.json

Assuming your server is running and you have `sample_keypoints.json` in your current directory:

```bash
curl -X POST "http://localhost:8000/predict" \
  -H "Content-Type: application/json" \
  --data-binary @sample_keypoints.json
```

Example output:

```json
{
  "gesture": "Yield_Curve",
  "confidence": 0.9712187647819519,
  "pred_idx": 27,
  "actions": [
    "X-Ray", "X-Ray_Cassettes", "X-Ray_Safe_Light", "X-Ray_Viewer", "Xbox", "Xylem", "Xylophone", "Y_Connection", "Yahoo", "Yak", "Yak_", "Yamaha_Bike", "Yardstick", "Yarn", "Yawn", "Year", "Year_After_Year", "Yearlong", "Yearn_Long", "Yell_Shout_Shriek_Scream", "Yellow", "Yellow_Fever", "Yellow_Flowered_Plants", "Yes", "Yes_", "Yesterday", "Yield", "Yield_Curve", "Yoga", "Yoke", "Yolk", "Yolk_", "You", "You_Can_t_Judge_a_Book_by_Its_Cover", "Young", "Younger", "Younger_Brother", "Younger_Sister", "Your", "Yourself", "Youth", "Youth_Association_of_the_Deaf_", "Youtube", "Yoyo", "Zambia", "Zebra", "Zebra_Crossing", "Zero", "Zero_Coupon_Bond _Deep_Discount_Bond", "Zigzag", "Zimbabwe", "Zimlets", "Zinc_Sheet", "Zip", "Zip_", "Zip_File", "Zipper", "Zipper_Foot", "Zone", "Zone_", "Zoo", "Zoo_", "Zoom", "Zoom_Client", "Zoom_Phone", "Zoom_Rooms", "Zorbing_Globe_Riding"
  ]
}
```

## Notes
- The input to `/predict` must be a list of 20 arrays, each array containing 1662 float values (matching the model input).
- If the model or label map fails to load, the service will return a 500 error for predictions.

## Troubleshooting
- If you see errors about missing model or label map, check the file paths and existence of `isl_sign_language_model.h5` and `isl_label_map.pkl`.
- For dependency issues, ensure your virtual environment is activated and all required packages are installed.

## License
Specify your license here.

## Author
Add your name or organization here.
