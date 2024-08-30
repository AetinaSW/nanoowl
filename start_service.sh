#!/bin/bash

# start nanoowl ui service
/home/nvidia/nanoowl_aetina/ui/docker-run.sh 
xdg-open http://0.0.0.0:7861

# run nanoowl service
jetson-containers run -v /home/nvidia/nanoowl_aetina:/opt/nanoowl_aetina --workdir /opt/nanoowl_aetina/examples/tree_demo   $(autotag nanoowl)     python3 tree_demo.py /opt/nanoowl/data/owl_image_encoder_patch32.engine


