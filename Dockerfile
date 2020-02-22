FROM python:3.6.8

MAINTAINER Will Li

ENV PROJECTDIR = /MRS

# Install basic apps
RUN apt update && apt install -y python3-pip git vim curl mysql-server

# Change default python veriosn
RUN echo  'alias python=python3' >> ~/.bashrc 
RUN source ~/.bashrc

# Install dependencies
WORKDIR $PROJECTDIR
COPY requirements.txt .
RUN virturalenv venv
RUN source venv/bin/activate
RUN pip install --upgrade pip
RUN pip install -r requirements.txt


EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]]