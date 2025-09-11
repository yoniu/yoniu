---
title: "Go 简易登陆功能：go-redis Hash"
datePublished: Sat Jun 03 2023 07:56:09 GMT+0000 (Coordinated Universal Time)
cuid: clifp9tes000509mq4r3j8gba
permalink: /go-login-go-redis-hash/index.html
tags: ['go', 'redis']

---

我们要实现的功能是通过 Redis 来存储用户信息，但是存储之前我们先要从数据库里拿到这些数据。

我们先假装有一个数据库，因为要简单，所以直接用代码伪装一个数据库。

但是再此之前需要先定义一个 `User` 类。

```go
type User struct {
	Id int64 `json:"id" redis:"id"`
	Username string `json:"username" redis:"username"`
	Password string `json:"password" redis:"password"`
	Email string `json:"email" redis:"email"`
	Url string `json:"url" redis:"url"`
}
```

然后自己假装一个数据库（需要有注册、获取功能）：

```go
type YouDB struct {
	users map[string]*User
}

func (y *YouDB) Register(user *User) {
	y.users[user.Username] = user
}

func (y *YouDB) GetUser(username string) (*User, error) {
	user, ok := y.users[username]
	if !ok {
		return &User{}, errors.New("用户不存在")
	}
	return user, nil
}
```

然后因为是测试而已，所以需要自己新建一些用户信息，用上面的 `YouDB` 类创建一个数据库：

```go
func BeforeDb() *YouDB {
	db := &YouDB{
		users: make(map[string]*User),
	}
	db.Register(&User{
		Id:       1,
		Username: "zhangsan",
		Password: "123456",
		Email:    "123@qq.com",
		Url:      "https://200011.net",
	})
	db.Register(&User{
		Id:       2,
		Username: "lisi",
		Password: "321123",
		Email:    "321@qq.com",
		Url:      "https://blog.200011.net",
	})
	return db
}
```

然后就是 `Login` 函数了：

```go
func Login(username string, password string) {
	// 连接 redis
	rdb := connect.Connect()
	defer rdb.Close()
	// 获取 context
	ctx := context.Background()
	// 用户 Key 前缀
	prefix := "user:"
	// 当前待登陆用户的 key
	key := prefix + username
	// 执行操作
	getAll := rdb.HGetAll(ctx, key)
	userCache, err := getAll.Result()
	user := new(User)
	if err == nil {
		if len(userCache) == 0 {
			// 如果 HGetAll 的结果为空，则用户不在 Redis，需要到数据库读取数据
			fmt.Println("用户缓存不在 Redis，开始从数据库读取数据")
			// 从数据库读取用户信息
			db := BeforeDb()
			mUser, err := db.GetUser(username)
			if err != nil {
				fmt.Printf("登陆失败：%s\n", err.Error())
				return
			}
			user = mUser
			// 将 user 使用 Hash 写入 Redis
			err = rdb.HSet(ctx, key, user).Err()
			if err != nil {
				fmt.Printf("登陆失败：%s\n", err.Error())
				return
			}
			fmt.Printf("User: %s, 已写入缓存\n", user.Username)
		} else {
			// 如果已经存在 Redis 中
			fmt.Println("缓存hit")
			// 将用户的信息从 Hash 读取到 user
			getAll.Scan(user)
		}
		// 判断密码是否正确
		if user.Password == password {
			fmt.Println("登陆成功")
		} else {
			fmt.Println("登陆失败：密码错误")
		}
	} else {
		fmt.Println(err.Error())
	}
	fmt.Println("=====================================")
}
```

简单测试一下：

```go
func TestLogin(t *testing.T) {
	Login("zhangsan", "123456")
	Login("lisi", "123123")
}
```

输出如下：

![](https://blog.oss.200011.net/11ty/20259/1757579169905-6b1ea791-caf1-4f5a-8ee3-1e31ed3b04fc.png){align=center}

代码思路：[说透 Redis7：第 9 篇](https://s.juejin.cn/ds/UXenBj9/)