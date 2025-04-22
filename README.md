# Image Upload API
A simple Express.js server that allows image uploads and serves them securely.

## .env Example
```ini
PORT=3000
MAX_SIZE_MB=2
```

### Upload Image
```bash
curl.exe -F "image=@C:\Users\Kirti\Desktop\ss.png" http://localhost:3000/api/upload
```

### Get Storage Info
```bash
curl http://localhost:3000/api/storage
```