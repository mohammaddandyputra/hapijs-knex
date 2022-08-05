Ganti branch
>>>>>>> main

1. Sign In
- Method      : POST
- URL         : http://localhost:3000/api/v1/login
- Requirement : username, password


2. Register
- Method      : POST
- URL         : http://localhost:3000/api/v1/register
- Requirement : username, password


3. Update Role
- Method      : POST
- URL         : http://localhost:3000/api/v1/update-role
- Requirement : username, role
- Role        : ADMIN
- Bearer token


4. Profile
- Method      : GET
- URL         : http://localhost:3000/api/v1/profile
- Requirement : -
- Bearer token


5. All Data Barang
- Method      : GET
- URL         : http://localhost:3000/api/v1/barang
- Requirement : -
- Bearer token


6. Detail Barang
- Method      : GET
- URL         : http://localhost:3000/api/v1/barang/{kode_barang}
- Requirement : -
- Bearer token


7. Add Barang
- Method      : POST
- URL         : http://localhost:3000/api/v1/barang
- Requirement : nama_barang, stok
- Role        : ADMIN
- Bearer token


8. Update Barang
- Method      : PUT
- URL         : http://localhost:3000/api/v1/barang/{kode_barang}
- Requirement : nama_barang, stok
- Role        : ADMIN
- Bearer token


9. Delete Barang
- Method      : DELETE
- URL         : http://localhost:3000/api/v1/barang/{kode_barang}
- Requirement : -
- Role        : ADMIN
- Bearer token


10. Send Mail
- Method      : POST
- URL         : http://localhost:3000/api/v1/send-email
- Requirement : to, subject
- Bearer token