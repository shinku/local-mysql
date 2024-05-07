/* user 表 */
create table if not exists users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  uid VARCHAR(20) NOT null
);


create table if not exists names (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20) NOT null
)