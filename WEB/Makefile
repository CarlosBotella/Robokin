
.PHONY: bridge
.PHONY: gazebo
.PHONY: nav
.PHONY: server
.PHONY: initial
.PHONY: empezar

bridge:
	ros2 launch rosbridge_server rosbridge_websocket_launch.xml
gazebo:
	ros2 launch my_world turtlebot3_my_world.launch.py
initial:
	ros2 run my_nav2_system initial_pose_pub
nav:
	ros2 launch my_nav2_system my_tb3_sim_nav2.launch.py
server:
	python3 -m http.server 8000

empezar:

	firefox localhost:8000
	make -j 4 bridge gazebo nav server