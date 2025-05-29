// Refatoração completa do Exercício Dia 10
var ProductManager = /** @class */ (function () {
    function ProductManager(container, formSection, formInputs, saveButton, toggleFormButton) {
        var _this = this;
        this.container = container;
        this.formSection = formSection;
        this.formInputs = formInputs;
        this.saveButton = saveButton;
        this.toggleFormButton = toggleFormButton;
        this.products = [];
        this.STORAGE_KEY = 'sailProducts';
        this.editIndex = null;
        this.loadProducts();
        this.saveButton.addEventListener('click', function (e) { return _this.handleSave(e); });
        this.toggleFormButton.addEventListener('click', function () { return _this.toggleForm(); });
        this.render();
        this.hideForm();
    }
    ProductManager.prototype.loadProducts = function () {
        var data = localStorage.getItem(this.STORAGE_KEY);
        if (data) {
            this.products = JSON.parse(data);
        }
        else {
            this.products = [
                { name: 'Camiseta Polo Branca', price: 29.99, category: 'Camisetas', saleStatus: 'Ativo' },
                { name: 'Calça Jeans', price: 49.99, category: 'Calças', saleStatus: 'Ativo' },
                { name: 'Tênis Adidas', price: 99.99, category: 'Tênis', saleStatus: 'Ativo' },
                { name: 'Blusa de Moletom', price: 39.99, category: 'Blusas', saleStatus: 'Ativo' },
                { name: 'Bermuda Jeans', price: 24.99, category: 'Bermudas', saleStatus: 'Ativo' },
                { name: 'Camiseta Verde', price: 59.99, category: 'Camisetas', saleStatus: 'Ativo' },
                { name: 'Calça Jeans Azul', price: 49.99, category: 'Calças', saleStatus: 'Ativo' },
                { name: 'Tênis Nike', price: 129.99, category: 'Tênis', saleStatus: 'Ativo' },
                { name: 'Blusa de Moletom Preta', price: 39.99, category: 'Blusas', saleStatus: 'Ativo' },
                { name: 'Bermuda Jeans Azul', price: 24.99, category: 'Bermudas', saleStatus: 'Ativo' },
                { name: 'Camiseta Polo Azul', price: 29.99, category: 'Camisetas', saleStatus: 'Ativo' }
            ];
            this.saveProducts();
        }
    };
    ProductManager.prototype.saveProducts = function () {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.products));
    };
    ProductManager.prototype.toggleForm = function () {
        var visible = this.formSection.style.display === 'block';
        this.formSection.style.display = visible ? 'none' : 'block';
        this.toggleFormButton.textContent = visible ? '+ Novo Produto' : 'Cancelar';
        if (!visible)
            this.clearForm();
    };
    ProductManager.prototype.showForm = function () {
        this.formSection.style.display = 'block';
    };
    ProductManager.prototype.hideForm = function () {
        this.formSection.style.display = 'none';
    };
    ProductManager.prototype.clearForm = function () {
        this.formInputs.name.value = '';
        this.formInputs.price.value = '';
        this.formInputs.category.value = '';
        this.formInputs.status.value = '';
        this.editIndex = null;
    };
    ProductManager.prototype.handleSave = function (e) {
        e.preventDefault();
        var name = this.formInputs.name.value.trim();
        var price = parseFloat(this.formInputs.price.value);
        var category = this.formInputs.category.value.trim();
        var status = this.formInputs.status.value.trim();
        if (!name || isNaN(price) || !category || !status) {
            alert('Preencha todos os campos corretamente.');
            return;
        }
        var product = { name: name, price: price, category: category, saleStatus: status };
        if (this.editIndex !== null) {
            this.products[this.editIndex] = product;
        }
        else {
            this.products.push(product);
        }
        this.saveProducts();
        this.render();
        this.clearForm();
        this.hideForm();
    };
    ProductManager.prototype.render = function () {
        var _this = this;
        this.container.innerHTML = '';
        this.products.forEach(function (product, index) {
            var _a, _b;
            var card = document.createElement('div');
            card.classList.add('product-card');
            card.innerHTML = "\n        <h2 class=\"name\">".concat(product.name, "</h2>\n        <p class=\"price\">Pre\u00E7o: R$ ").concat(product.price.toFixed(2), "</p>\n        <p class=\"category\">Categoria: ").concat(product.category, "</p>\n        <p class=\"saleStatus\">Status de Venda: ").concat(product.saleStatus, "</p>\n        <button class=\"edit-btn\">Editar</button>\n        <button class=\"delete-btn\">Excluir</button>\n      ");
            (_a = card.querySelector('.delete-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return _this.removeProduct(index); });
            (_b = card.querySelector('.edit-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () { return _this.editProduct(index); });
            _this.container.appendChild(card);
        });
    };
    ProductManager.prototype.removeProduct = function (index) {
        this.products.splice(index, 1);
        this.saveProducts();
        this.render();
    };
    ProductManager.prototype.editProduct = function (index) {
        var product = this.products[index];
        this.formInputs.name.value = product.name;
        this.formInputs.price.value = product.price.toString();
        this.formInputs.category.value = product.category;
        this.formInputs.status.value = product.saleStatus;
        this.editIndex = index;
        this.showForm();
        this.toggleFormButton.textContent = 'Cancelar';
    };
    return ProductManager;
}());
var manager = new ProductManager(document.getElementById('productList'), document.getElementById('productFormSection'), {
    name: document.getElementById('productName'),
    price: document.getElementById('productPrice'),
    category: document.getElementById('productCategory'),
    status: document.getElementById('productStatus'),
}, document.getElementById('saveBtn'), document.getElementById('addProductBtn'));
//# sourceMappingURL=index.js.map