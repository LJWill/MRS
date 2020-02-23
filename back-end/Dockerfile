FROM python:3.7.5

MAINTAINER Will Li

# Set up and activate virtual environment
# ENV VIRTUAL_ENV "/venv"
# RUN python -m venv $VIRTUAL_ENV
# ENV PATH "$VIRTUAL_ENV/bin:$PATH"
ENV PROJECTDIR = /back-end

# Install basic apps
# RUN sudo apt update && sudo apt install -y python3-pip git vim curl mysql-server

# Install dependencies
WORKDIR $PROJECTDIR
COPY requirements.txt .
# RUN apk add --update py-pip
RUN python -m pip install -r requirements.txt
COPY . ./back-end


EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]]