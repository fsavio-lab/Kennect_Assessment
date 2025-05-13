from http.server import HTTPServer, BaseHTTPRequestHandler
import config
# import os
from datetime import datetime, timedelta
import traceback
import json
from urllib.parse import urlparse, parse_qs

class DateTimeFormat():
    HUMANIZED = "humanized"
    ISOFORMAT = "default"


def alter_date(
    datetime_obj: datetime,
    seconds: int = None,
    minutes: int = None,
    hours: int = None,
    days: int = None,
    weeks: int = None,
    months: int = None,
    years: int = None,
) -> "Datetime":
    """
    Alter date based on arguments

    :params
    datetime_obj: datetime,
    seconds: int
    minutes: int
    hours: int
    days: int
    weeks: int
    months: int
    years: int

    :returns:
    datetime: Altered datetime object

    """
    if seconds:
        datetime_obj += timedelta(seconds=seconds)
    if minutes:
        datetime_obj += timedelta(minutes=minutes)
    if hours:
        datetime_obj += timedelta(hours=hours)
    if days:
        datetime_obj += timedelta(days=days)
    if weeks:
        datetime_obj += timedelta(weeks=weeks)
    if months:
        datetime_obj += timedelta(months=months)
    if years:
        datetime_obj += timedelta(days=365 * years)

    return datetime_obj


class CalendarAPI(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            parsed_path = urlparse(self.path)
            if parsed_path.path == "/datetime":
                query_params = parse_qs(parsed_path.query)
                date_type = query_params["type"][0] if "type" in query_params else DateTimeFormat.ISOFORMAT
                if "date" in query_params:
                    result = datetime.fromisoformat(query_params["date"][0])
                else:
                    result = datetime.now()
                if "seconds" in query_params:
                    result = alter_date(result, seconds=int(query_params["seconds"][0]))
                if "minutes" in query_params:
                    result = alter_date(result, minutes=int(query_params["minutes"][0]))
                if "hours" in query_params:
                   result = alter_date(result, hours=int(query_params["hours"][0]))
                if "days" in query_params:
                    result = alter_date(result, days=int(query_params["days"][0]))
                if "weeks" in query_params:
                    result = alter_date(result, weeks=int(query_params["weeks"][0]))
                if "months" in query_params:
                    result = alter_date(
                        result, months=int(query_params["months"][0])
                    )
                if "years" in query_params:
                    result = alter_date(result, years=int(query_params["years"][0]))
                if date_type == DateTimeFormat.HUMANIZED:
                    result = datetime.strftime(result, "%d-%b-%Y %I:%H:%S")
                else:
                    result = result.isoformat()
                self.send_response(200)
                self.send_header("Content-type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps(result, indent=2).encode())
            else:
                self.send_error(404, "Endpoint not found.")
        except Exception as e:
            self.send_error(
                500,
                f"Internal Server Error\n\n{traceback.print_exc()}",
            )


def run():
    server_address = (config.HOST, config.PORT)
    httpd = HTTPServer(server_address, CalendarAPI)
    print(f"Serving on http://{config.HOST}:{config.PORT}")
    httpd.serve_forever()


if __name__ == "__main__":
    run()
