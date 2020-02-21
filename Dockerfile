FROM ubuntu:18.04

MAINTAINER Will Li

ENV PROJECTDIR = /MRS

# Install basic apps
RUN apt-get update && apt-get install -y git vim curl mysql-server

# Change default python veriosn
RUN echo  'alias python=python3' >> ~/.bashrc 
RUN source ~/.bashrc

# Install dependencies
WORKDIR $PROJECTDIR
COPY requirements.txt .
RUN virturalenv venv
RUN source venv/bin/activate
RUN pip install -r requirements.txt


EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]]