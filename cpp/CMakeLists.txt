cmake_minimum_required(VERSION 3.14)
project(MABSplitCppEngine VERSION 1.0.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

if(MSVC)
    add_compile_options(/W4 /O2)
else()
    add_compile_options(-Wall -Wextra -O3 -march=native)
endif()

# Header-only library target
add_library(mab_engine_headers INTERFACE)
target_include_directories(mab_engine_headers INTERFACE ${CMAKE_CURRENT_SOURCE_DIR})

# C++ High-Throughput Benchmark Runner Executable
add_executable(mab_cpp_benchmark main.cpp)
target_link_libraries(mab_cpp_benchmark PRIVATE mab_engine_headers)

enable_testing()
add_test(NAME CppEngineBenchmark COMMAND mab_cpp_benchmark)
