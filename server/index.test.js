import { expect } from "chai";
import { initializeTestDb, insertTestUser, getToken } from "./helper/test.js";
const base_url = 'http://localhost:3001/'

describe('GET tasks', () => {
    before(() => {
        initializeTestDb()
    })

    insertTestUser("get@mymail.com", "veryStrongPassword")
    const token = getToken("get@mymail.com")
    it('should get all tasks', async() => {
        const response = await fetch(base_url + 'get', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
        })
        const data = await response.json()

        expect(response.status).to.equal(200)
        expect(data).to.be.an('array').that.is.not.empty
        expect(data[0]).to.include.all.keys('id', 'description')
    })
})

describe('DELETE a task', () => {
    insertTestUser("delete@mymail.com", "veryStrongPassword")
    const token = getToken("delete@mymail.com")
    it('should delete a task', async() => {
        const response = await fetch(base_url + 'deletetask/1', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
        })
        const data = await response.json()

        expect(response.status).to.be.equal(200)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('id')
    })

    it('should not delete a task with SQL injection', async() => {
        const token = getToken("delete@mymail.com")
        const response = await fetch(base_url + 'deletetask/id=0 or id > 0', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
        })
        const data = await response.json()
        expect(response.status).to.equal(500)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
    })
})

describe('POST task', () => { 
    insertTestUser("post@mymail.com", "veryStrongPassword")
    const token = getToken("post@mymail.com")

    it('should add new task', async() => {
        const response = await fetch(base_url + 'addnewtask', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify({ description: "task from test" })
        })
        const data = await response.json()

        expect(response.status).to.equal(200)
        expect(data).to.be.an('object').to.include.all.keys('id')
    })

    it('should not post a task without description', async() => {
        const token = getToken("post@mymail.com")
        const response = await fetch(base_url + 'addnewtask', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify({ description: null })
        })
        const data = await response.json()

        expect(response.status).to.equal(400, data.error)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
    })

    it('should not post a task with zero length description', async() => {
        const token = getToken("post@mymail.com")
        const response = await fetch(base_url + 'addnewtask', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify({ description: '' })
        })
        const data = await response.json()

        expect(response.status).to.equal(400, data.error)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
    })
})

describe('POST register', () => {
    it('should register a user with valid email and password', async() => {
        const response = await fetch(base_url + 'user/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: 'example@mymail.com', password: 'strongPassword' })
        })
        const data = await response.json()

        expect(response.status).to.be.equal(200)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('id', 'email')
    })

    it('should login with valid credentials', async() => {
        const email = 'example@mymail.com'
        const password = 'strongPassword'
        insertTestUser(email, password)
        const response = await fetch(base_url + 'user/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
        const data = await response.json()

        expect(response.status).to.be.equal(200)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('id', 'email', 'token')
    })
})