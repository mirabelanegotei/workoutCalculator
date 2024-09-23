cartItems = document.querySelector("#cart-items");
const addButton = document.querySelector("#add");
const errorMessage = document.querySelector("#product-message");

const listOfProducts = JSON.parse(localStorage.getItem("productsList")) || [];

const saveCart = () =>{
    localStorage.setItem("productsList", JSON.stringify(listOfProducts));
    displayCart();
}

const updateQuantity = (index, newQuantity) => {
    listOfProducts[index].quantity = newQuantity;
    saveCart();
}

function removeProduct(index) {
    listOfProducts.splice(index,1);
    saveCart();
}

const displayCart = () => {
    cartItems.innerHTML = ''; 

    if (listOfProducts.length === 0) {
        cartItems.innerHTML = '<tr><td colspan="4">No products in the cart</td></tr>';
        return;
    }

    listOfProducts.forEach((product,index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
           <td>${product.name}</td>
            <td><input type="number" value="${product.quantity}" min="1" id="quantity-${index}" disabled></td>
            <td>
                <button class="delete-btn" id="remove-${index}">Remove</button>
            </td>
            <td class="action-buttons">
                <button class="modify-btn" id="modify-${index}">Modify</button>
                <button class="update-btn" id="update-${index}" style="display: none;">Update</button>
                <button class="cancel-btn" id="cancel-${index}" style="display: none;">Cancel</button>
            </td
        `;

        cartItems.appendChild(row);

         document.querySelector(`#remove-${index}`).addEventListener('click', () => {
            if(confirm("Are you sure to remove " + listOfProducts[index].name + " from the list?")){
            removeProduct(index);}
            else{}
        });

        document.querySelector(`#modify-${index}`).addEventListener('click', () => {
            enableQuantity(index);
        });
    });
}

const toggleEditState = (index, isEditing) =>{
    const quantityInput = document.querySelector(`#quantity-${index}`);
    const modifyBtn = document.querySelector(`#modify-${index}`);
    const updateBtn = document.querySelector(`#update-${index}`);
    const cancelBtn = document.querySelector(`#cancel-${index}`);

    quantityInput.disabled = !isEditing;
    modifyBtn.style.display = isEditing ? 'none' : 'inline-block';
    updateBtn.style.display = isEditing ? 'inline-block' : 'none';
    cancelBtn.style.display = isEditing ? 'inline-block' : 'none';
}

const enableQuantity = (index) =>{
    const quantityInput = document.querySelector(`#quantity-${index}`);
    const updateBtn = document.querySelector(`#update-${index}`);
    const cancelBtn = document.querySelector(`#cancel-${index}`);

    const quantity = listOfProducts[index].quantity;

    toggleEditState(index, true);

    updateBtn.addEventListener("click", ()=>{
        const newQuantity = Number(quantityInput.value);

        if (isNaN(newQuantity) || newQuantity < 1) {
            alert("Quantity must be a number greater than or equal to 1");
            return;
        }
        updateQuantity(index,newQuantity);
        toggleEditState(index, false);
    });

    cancelBtn.addEventListener('click', () => {
        quantityInput.value = quantity; 
        toggleEditState(index, false);
    });
}

const addProduct = () =>{
    const productName = document.querySelector("#product-name").value;
    const productQuantity = Number(document.querySelector("#product-quantity").value);
   
    if(productName.trim()==="" && productQuantity < 1){
        errorMessage.style.color="red";
        errorMessage.textContent = "Please enter values in both fields!";
        return;
    }else if(productName.trim() === ""){
        errorMessage.textContent = "Product name cannot be empty"
        errorMessage.style.color="red";
        return;
    }else if(isNaN(productQuantity) || productQuantity < 1){
        errorMessage.textContent = "Quantity must be a number greater than or equal to 1";
        errorMessage.style.color="red";
        return;
    }

    let product = {
        name: productName,
        quantity: productQuantity
    };

    const existingProduct = listOfProducts.find(product=> product.name.toLowerCase() === productName.toLowerCase());
    
    if (existingProduct) {
        const newProductQuantity = Number(existingProduct.quantity) + productQuantity;
        existingProduct.quantity = newProductQuantity;
    } else {
        listOfProducts.push(product);
    }
    
    saveCart();

    document.querySelector("#product-name").value = "";
    document.querySelector("#product-quantity").value = "";
    errorMessage.textContent="";
}

addButton.addEventListener("click", addProduct);
document.addEventListener('DOMContentLoaded', displayCart);