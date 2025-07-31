import json

data = {
    "keypoints": [[0.0 for _ in range(1662)] for _ in range(20)]
}

with open("sample_keypoints.json", "w") as f:
    json.dump(data, f)