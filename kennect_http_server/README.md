# Simple Python HTTP Server with Calendar REST API

This project provides a lightweight HTTP server in Python that exposes a REST API endpoint to retrieve the current date and time, with optional filters for days, weeks, months, and years additions/subtractions.

---

## Features

- REST API at `/datetime`
- Query parameters:
  - `days`
  - `weeks`
  - `months`
  - `years`
- Alters time from the current date based on query filters and returns results in ISO format
- Built with Python’s HTTP standard library 

---

## 🛠️ Installation

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/http_server_project.git
cd http_server_project
```

2. **(Optional) Create a virtual environment:**

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install the package locally:**

```bash
pip install .
```

---

## Usage

Run the server using the CLI:

```bash
runserver
```

By default, it will start on:
[http://localhost:8080](http://localhost:8080)

You can change the defaults at `config.py`

---

## API Usage

**Endpoint:**

```
GET /datetime
```

**Optional query parameters:**

| Parameter | Description       | Example     |
| --------- | ----------------- | ----------- |
| `seconds`   | Add/Subtract N weeks  | `?seconds=1`,`seconds=-3` |
| `minutes`  | Add/Subtract N months | `?minutes=2`,`minutes=-3` |
| `hours`   | Add/Subtract N years  | `?hours=1`,`hours=-3` |
| `days`    | Add/Subtract N days   | `?days=3`,`days=-3`   |
| `weeks`   | Add/Subtract N weeks  | `?weeks=1`,`weeks=-3` |
| `months`  | Add/Subtract N months | `?months=2`,`months=-3` |
| `years`   | Add/Subtract N years  | `?years=1`,`years=-3` |

### 📌 Example:

```bash
curl "localhost:8080/datetime?date=2026-04-12T23:36:48.079852&days=5&months=1"
```

**Response:**

```json
"2026-04-12T23:36:48.079852"
```

```bash
curl "localhost:8080/datetime?date=2026-04-12T23:36:48.079852&days=5&months=1&type=humanized"
```

**Response:**

```json
"12-Apr-2026 11:23:48"
```

---

## 📌 Requirements

* Python 3.7+

---

## 📄 License

This project is unlicensed<br>
Feel free to use and modify it!

---

## ✨ Author

Developed by Savio Fernando

