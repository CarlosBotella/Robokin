
.PHONY: bridge
.PHONY: gazebo
.PHONY: nav
.PHONY: server
.PHONY: initial
.PHONY: empezar
.PHONY: compilar

bridge:
	ros2 launch rosbridge_server rosbridge_websocket_launch.xml
gazebo:
	ros2 launch robokin_world robokin_world.launch.py
initial:
	ros2 run robokin_nav_system initial_pose_pub
nav:
	ros2 launch robokin_nav_system my_nav2_waypoints_follower.launch.py
server:
	python3 -m http.server 8000

empezar:

	firefox http://localhost/Robokin2/WEB/html/inicio.html
	make -j 4 bridge gazebo nav server

compilar:
	cd ..
	cd ROS
	source install/setup.bash
	cd ..
	cd WEB