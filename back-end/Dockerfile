FROM python:3.7-alpine

MAINTAINER Will Li

ENV PROJECTDIR = /MRS

# Install basic apps
RUN apt update && apt install -y python3-pip git vim curl mysql-server

# Install dependencies
WORKDIR $PROJECTDIR
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .


EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]]