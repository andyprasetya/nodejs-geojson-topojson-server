#!/bin/sh
sudo cp pdf-generator.service /usr/lib/systemd/system/pdf-generator.service && 
sudo systemctl enable pdf-generator.service