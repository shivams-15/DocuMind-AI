import importlib
import pkg_resources

# List of packages to check
packages = [
    "fastapi",
    "uvicorn",
    "python_multipart",
    "agentic_doc",
    "requests",
    "python_dotenv",
    "Pillow",
    "cv2",
    "openai",
    "jose",
    "passlib"
]

print("Package Versions:")
for pkg in packages:
    try:
        # Some packages have different import and pip names
        if pkg == "python_multipart":
            mod = importlib.import_module("multipart")
            version = mod.__version__
        elif pkg == "python_dotenv":
            mod = importlib.import_module("dotenv")
            version = mod.__version__
        elif pkg == "cv2":
            mod = importlib.import_module("cv2")
            version = mod.__version__
        elif pkg == "jose":
            mod = importlib.import_module("jose")
            version = mod.__version__
        else:
            mod = importlib.import_module(pkg)
            version = getattr(mod, "__version__", None)
            if version is None:
                # Try pkg_resources as fallback
                version = pkg_resources.get_distribution(pkg).version
        print(f"{pkg}: {version}")
    except Exception as e:
        print(f"{pkg}: NOT INSTALLED or error: {e}")
