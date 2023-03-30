# E-commerce
<p>the complete function are in the sql file</p>
<p> in SQL: postgres is used as server</p>

<p>for cloning the project copy the below code</p><br>

```
  git clone https://github.com/Harshgupta30/E-commerce-SQL.git
  ```
<br>
Install Postgrace admin<br>
create four tables<br>
<!-- ### users -->
<details>
<summary>users</summary>
1:"name"<br>
2:"username"<br>
3:"password"<br>
4:"email"<br>
5:"isverified"<br>
6:"token"<br>
7:"usertype"<br>
</details>
<!-- ### products -->
<details>
<summary>products</summary>
1:"id"<br>
2:"image"<br>
3:"name"<br>
4:"price"<br>
5:"details"<br>
6:"seller"<br>
7:"status"<br>
8:"quantity"<br>
</details>
<!-- ### cart -->
<details>
<summary>cart</summary>
1:"id"<br>
2:"username"<br>
3:"quantity"<br>
</details>
<!-- ### orders -->
<details>
<summary>orders</summary>
1:"id"<br>
2:"pid"<br>
3:"seller"<br>
4:"username"<br>
5:"quantity"<br>
</details><br>
move to the E-commerce-sql<br>

```
 npm install
  ```

```
  node app
  ```


<br>