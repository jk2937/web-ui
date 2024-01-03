#!/bin/bash
sudo apt -y update
sudo apt -y install python3-venv python3-pip
python3 -m venv venv
source venv/bin/activate
pip install flask
deactivate
