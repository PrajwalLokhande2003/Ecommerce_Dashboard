const express = require('express')
const db = require('./db/config')
const cors = require('cors')
const { getDownloadURL, ref, getStorage, uploadBytes } = require('firebase/storage')
const config = require('./db/firebaseconfig')
const { initializeApp } = require('firebase/app')
const multer = require('multer')

const app = express()
app.use(express.json())
app.use(cors())

initializeApp(config.firebaseConfig)


const upload = multer({ storage: multer.memoryStorage() })

const storage = getStorage();


app.post('/signup', (req, res) => {
    const data = req.body
    db.query('INsert INTO user SET ?', data, (err, result) => {
        if (err) console.log(err);
        else res.send(result)
    })
});


app.post('/signin', (req, res) => {
    const { email, password } = req.body
    const cmd = "SELECT * FROM user WHERE email=?"
    db.query(cmd, [email], async (err, result) => {
        const user = await result[0]
        if (err) {
            console.log(err)
        } else {
            if (user.password === password) {
                db.query("SELECT email,name,id FROM user WHERE email=? ", [email], async (err, result) => {
                    res.send(result)
                })
            }
        }

    })
});

app.post('/create-product', upload.single('image'), async (req, res) => {
    const refstorage = ref(storage, req.file.originalname)
    await uploadBytes(refstorage, req.file.buffer)
    
    const data = {
        image: await getDownloadURL(refstorage, req.file.originalname),
        product_name: req.body.product_name,
        product_categories: req.body.product_categories,
        brand: req.body.brand,
        weight: req.body.weight,
        size: req.body.size,
        color: req.body.color,
        tag_number: req.body.tag_number,
        stock: req.body.stock,
        // tag:req.body.tag,
        price: req.body.price,
        discount: req.body.discount,
        tax: req.body.tax,
        creator_id:req.body.creator_id

    }
    db.query('Insert INTO product SET ?', data, (err, result) => {
        if (err) console.log(err);
        else res.send(result)
    })
});

app.get('/product-list',(req, res) => {
    const query = "SELECT * FROM product"
    const id = req.params.id
    db.query(query,id,(err,result)=>{
        if(err) throw err;
        else res.send(result)
    })
});

app.get('/update-product-data/:id',(req, res) => {
    const query = "SELECT * FROM product WHERE id = ?"
    const id = req.params.id
    db.query(query,id,(err,result)=>{
        if(err) throw err;
        else res.send(result)
    })
})

app.put('/update-product/:id', (req, res) => {
    const data = [ req.body.product_name,req.body.product_categories,req.body.brand,req.body.weight,req.body.size,req.body.color,
req.body.tag_number,req.body.stock,req.body.price,req.body.discount,req.body.tax,req.params.id]

    const query = 'UPDATE product SET product_name = ?, product_categories = ?, brand = ?, weight = ?, size = ?, color = ?, tag_number = ?, stock = ?, price = ?, discount = ?, tax = ?  WHERE id = ?';

    db.query(query,data, (err, result) => {
        if (err) console.log(err);
        else res.send(result)

    })
});

app.put('/update-product-img/:id', upload.single('image'), async(req, res) => {
    const refstorage = ref(storage, req.file.originalname)
    await uploadBytes(refstorage, req.file.buffer)

    const data = [ await getDownloadURL(refstorage,req.file.originalname),req.params.id]

    const query = 'UPDATE product SET image = ?  WHERE id = ?';

    db.query(query,data, (err, result) => {
        if (err) console.log(err);
        else res.send(result)
    })
});

app.delete('/delete-product/:id',(req,res)=>{
    const query = "DELETE FROM product WHERE id = ?"

    db.query(query,req.params.id,(err,result)=>{
        if (err) console.log(err);
        else res.send(result)
    })
});

app.post('/transection', (req, res) => {
    const data = {
        order_by:req.body.order_by,
        tid:req.body.tid,
        item:req.body.item,
        purchase_status:req.body.purchase_status,
        date: req.body.date,
        total : req.body.total,
        payment_method : req.body.payment_method,
        payment_tatus : req.body.payment_tatus
    }
    db.query('Insert INTO transection SET ?', data, (err, result) => {
        if (err) console.log(err);
        else res.send(result)
    })
});

app.get('/transection-list',(req, res) => {
    const query = "SELECT * FROM transection"
    db.query(query,(err,result)=>{
        if(err) throw err;
        else res.send(result)
    })
});

app.post('/warehouse', (req, res) => {
    const data = {
        warehouse_name:req.body.warehouse_name,
        location:req.body.location,
        manager:req.body.manager,
        contact_number:req.body.contact_number,
        stock_available: req.body.stock_available,
        stock_shipping : req.body.stock_shipping,
        warehouse_revenue : req.body.warehouse_revenue
    }
    db.query('Insert INTO warehouse SET ?', data, (err, result) => {
        if (err) console.log(err);
        else res.send(result)
    })
});

app.get('/warehouse-list',(req, res) => {
    const query = "SELECT * FROM warehouse"
    db.query(query,(err,result)=>{
        if(err) throw err;
        else res.send(result)
    })
});

app.post('/received-order', (req, res) => {
    const data = {
        order_id:req.body.order_id,
        customer:req.body.customer,
        item:req.body.item,
        contact_number:req.body.contact_number,
        amount: req.body.amount,
        received_status : req.body.received_status,
        payment_status : req.body.payment_status
    }
    db.query('Insert INTO  received_order SET ?', data, (err, result) => {
        if (err) console.log(err);
        else res.send(result)
    })
});

app.get('/received-order',(req, res) => {
    const query = "SELECT * FROM  received_order"
    db.query(query,(err,result)=>{
        if(err) throw err;
        else res.send(result)
    })
});

app.post('/create-categorie', upload.single('image'), async(req, res) => {
    const refstorage = ref(storage, req.file.originalname)
    await uploadBytes(refstorage, req.file.buffer)
    
    const data = {
        image: await getDownloadURL(refstorage, req.file.originalname),
        creator_name: req.body.creator_name,
        title: req.body.title,
        stock: req.body.stock,
        creator_id:req.body.creator_id,
        tag_id:req.body.tag_id,
        price:req.body.price


    }
    db.query('Insert INTO categorie SET ?', data, (err, result) => {
        if (err) console.log(err);
        else res.send(result)
    })
});

app.get('/categorie-list',(req, res) => {
    const query = "SELECT * FROM  categorie"
    db.query(query,(err,result)=>{
        if(err) throw err;
        else res.send(result)
    })
});

app.post('/create-profile', upload.single('image'), async(req, res) => {
    const refstorage = ref(storage, req.file.originalname)
    await uploadBytes(refstorage, req.file.buffer)
    
    const data = {
        image: await getDownloadURL(refstorage, req.file.originalname),
        name: req.body.name,
        title: req.body.title,
        info: req.body.info,
        u_id:req.body.u_id,
        address:req.body.address,
        mobile:req.body.mobile


    }
    db.query('Insert INTO p_info SET ?', data, (err, result) => {
        if (err) console.log(err);
        else res.send(result)
    })
});

app.get('/get-profile/:id',(req, res) => {
    const query = "SELECT * FROM  p_info where u_id = ?"
    db.query(query,req.params.id,(err,result)=>{
        if(err) throw err;
        else res.send(result)
    })
});


app.listen(5000)