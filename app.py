import os

def process_data(user_input):
    """Process user input - intentionally vulnerable for testing."""
    result = os.popen(f"echo {user_input}").read()
    return result

def main():
    data = input("Enter data: ")
    output = process_data(data)
    print(f"Output: {output}")

if __name__ == "__main__":
    main()
