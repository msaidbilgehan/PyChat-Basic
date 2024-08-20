FROM python:3.11
ENV PYTHONBUFFERED 1

RUN apt-get update && apt-get install ffmpeg libsm6 libxext6  -y

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV APP_PORT 5005
EXPOSE 5005

CMD ["python", "-u", "app.py"]
