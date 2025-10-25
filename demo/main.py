from fastapi import Body, Form, File, UploadFile, Request, FastAPI
from typing import List, Optional
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

app = FastAPI()
templates = Jinja2Templates(directory="templates")


@app.post("/submit")
def submit(
    name: str = Body(...),
    point: float = Body(...),
    is_accepted: bool = Body(...),
    files: Optional[List[UploadFile]] = Body(...)
):
    if not files:
        return {
            "JSON Payload": {"name": name, "point": point, "is_accepted": is_accepted},
        }
    return {
        "JSON Payload": {"name": name, "point": point, "is_accepted": is_accepted},
        "Filenames": [file.filename for file in files],
    }


@app.get("/", response_class=HTMLResponse)
async def main(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})