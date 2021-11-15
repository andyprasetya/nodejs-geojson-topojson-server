#!/bin/sh
sudo cp trulogix-external-api.service /usr/lib/systemd/system/trulogix-external-api.service && 
sudo systemctl enable trulogix-external-api.service && 
echo "Service installation completed."
