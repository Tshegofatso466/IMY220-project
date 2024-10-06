main:	*.o
	g++	-g	-o	main	*.o
*.o:	*.cpp
	g++	-g	-c	*.cpp
run:	main
	./main
clean:
	rm	*.o	main