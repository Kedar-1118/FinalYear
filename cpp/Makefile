# Makefile for MABSplit C++17 Bare-Metal Engine Benchmark

CXX ?= g++
CXXFLAGS ?= -O3 -march=native -std=c++17 -Wall -Wextra -pthread

TARGET = mab_cpp_benchmark
SRCS = main.cpp
HEADERS = mab_engine.hpp serfling_bounds.hpp

.PHONY: all clean run

all: $(TARGET)

$(TARGET): $(SRCS) $(HEADERS)
	$(CXX) $(CXXFLAGS) -I. $(SRCS) -o $(TARGET)

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET) *.o
