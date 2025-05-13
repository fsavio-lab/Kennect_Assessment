from setuptools import setup, find_packages

setup(
    name='kennect_http_server',
    version='1.0.0',
    description='A simple Python HTTP server that handles Calendar GET requests',
    author='Savio Fernando',
    packages=find_packages(),
    py_modules=['server', 'config'],
    include_package_data=True,
    install_requires=[],
    entry_points={
        'console_scripts': [
            'runserver=server:run',
        ],
    },
)