// Refatoração completa do Exercício Dia 10

interface Product {
  name: string;
  price: number;
  category: string;
  saleStatus: 'Ativo' | 'Inativo';
}

class ProductManager {
  private products: Product[] = [];
  private readonly STORAGE_KEY = 'sailProducts';
  private editIndex: number | null = null;

  constructor(
    private container: HTMLElement,
    private formSection: HTMLElement,
    private formInputs: {
      name: HTMLInputElement,
      price: HTMLInputElement,
      category: HTMLInputElement,
      status: HTMLInputElement
    },
    private saveButton: HTMLButtonElement,
    private toggleFormButton: HTMLButtonElement
  ) {
    this.loadProducts();
    this.saveButton.addEventListener('click', (e) => this.handleSave(e));
    this.toggleFormButton.addEventListener('click', () => this.toggleForm());
    this.render();
    this.hideForm();
  }

  private loadProducts() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      this.products = JSON.parse(data);
    } else {
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
  }

  private saveProducts() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.products));
  }

  private toggleForm() {
    const visible = this.formSection.style.display === 'block';
    this.formSection.style.display = visible ? 'none' : 'block';
    this.toggleFormButton.textContent = visible ? '+ Novo Produto' : 'Cancelar';
    if (!visible) this.clearForm();
  }

  private showForm() {
    this.formSection.style.display = 'block';
  }

  private hideForm() {
    this.formSection.style.display = 'none';
  }

  private clearForm() {
    this.formInputs.name.value = '';
    this.formInputs.price.value = '';
    this.formInputs.category.value = '';
    this.formInputs.status.value = '';
    this.editIndex = null;
  }

  private handleSave(e: Event) {
    e.preventDefault();

    const name = this.formInputs.name.value.trim();
    const price = parseFloat(this.formInputs.price.value);
    const category = this.formInputs.category.value.trim();
    const status = this.formInputs.status.value.trim() as 'Ativo' | 'Inativo';

    if (!name || isNaN(price) || !category || !status) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    const product: Product = { name, price, category, saleStatus: status };

    if (this.editIndex !== null) {
      this.products[this.editIndex] = product;
    } else {
      this.products.push(product);
    }

    this.saveProducts();
    this.render();
    this.clearForm();
    this.hideForm();
  }

  private render() {
    this.container.innerHTML = '';
    this.products.forEach((product, index) => {
      const card = document.createElement('div');
      card.classList.add('product-card');

      card.innerHTML = `
        <h2 class="name">${product.name}</h2>
        <p class="price">Preço: R$ ${product.price.toFixed(2)}</p>
        <p class="category">Categoria: ${product.category}</p>
        <p class="saleStatus">Status de Venda: ${product.saleStatus}</p>
        <button class="edit-btn">Editar</button>
        <button class="delete-btn">Excluir</button>
      `;

      card.querySelector('.delete-btn')?.addEventListener('click', () => this.removeProduct(index));
      card.querySelector('.edit-btn')?.addEventListener('click', () => this.editProduct(index));

      this.container.appendChild(card);
    });
  }

  private removeProduct(index: number) {
    this.products.splice(index, 1);
    this.saveProducts();
    this.render();
  }

  private editProduct(index: number) {
    const product = this.products[index];
    this.formInputs.name.value = product.name;
    this.formInputs.price.value = product.price.toString();
    this.formInputs.category.value = product.category;
    this.formInputs.status.value = product.saleStatus;
    this.editIndex = index;
    this.showForm();
    this.toggleFormButton.textContent = 'Cancelar';
  }
}


const manager = new ProductManager(
  document.getElementById('productList')!,
  document.getElementById('productFormSection')!,
  {
    name: document.getElementById('productName') as HTMLInputElement,
    price: document.getElementById('productPrice') as HTMLInputElement,
    category: document.getElementById('productCategory') as HTMLInputElement,
    status: document.getElementById('productStatus') as HTMLInputElement,
  },
  document.getElementById('saveBtn') as HTMLButtonElement,
  document.getElementById('addProductBtn') as HTMLButtonElement
);