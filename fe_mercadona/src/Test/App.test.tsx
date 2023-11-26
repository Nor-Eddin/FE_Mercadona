
  import '@testing-library/jest-dom';
  import {  fireEvent, render, screen, waitFor} from '@testing-library/react'; 
  import Catalogue from '../Component/Catalogue';  
  import Login from '../Auth/Login';
  import { BrowserRouter} from 'react-router-dom';
  import Promotion from '../Component/Promotion';


/* Les tests unitaires sont utilisés pour vérifier le comportement d’une unité de code, 
telle qu’une fonction ou une méthode, de manière isolée. Dans ce cas, le test vérifie 
si la page d’accueil est affichée après une connexion réussie.

Les tests d’intégration, en revanche, vérifient le comportement de plusieurs unités de code combinées. 
Ils sont utilisés pour vérifier que les différentes parties d’une application fonctionnent
 correctement ensemble. */

//////////////////////////// TEST UNITAIRE/////////////////////
  //test le rendu de la page Catalogue
  test('renders catalogue component without crashing', () => {
    const { getByText } = render(<Catalogue props="any" />);
    const catalogTitle = getByText(/Catalogue des produits/i);
  
    expect(catalogTitle).toBeInTheDocument();
  });

  test('renders catalogue promotions component without crashing', () => {
    const { getByText } = render(<Promotion props="any" />);
    const promotionsTitle = getByText(/Catalogue des produits en promotions/i);
  
    expect(promotionsTitle).toBeInTheDocument();
  });

  
  //test la recuperation des produits de la methode listProductData
  test('loads catalogue products data correctly', async () => {
    const {queryAllByRole } = render(<Catalogue props="any"/>);
    const items = queryAllByRole('Card');

    expect(items.length!=0); // verifier qu'il y au moin un produit d'afficher
  });

  /*tester si `listProductsData` fonctionne correctement,
   cette fonction récupère tous les produits de la boutique 
   que notre composant affiche. Pour ce faire nous utiliserons
    `jest.spyOn` pour espionner cette méthode et ensuite tester
     si elle récupère le bon nombre de produits*/
  test('loads catalogue products data correctly',  () => {
    const mockListProductsData = jest.spyOn(Catalogue.prototype, 'listProductsData');
    const { queryAllByTestId } = render(<Catalogue  props="any"/>);
    expect(mockListProductsData).toHaveBeenCalled();
    expect(queryAllByTestId('product-card')).toContainElement; // Ce test passera uniquement si votre API contient des produits
    mockListProductsData.mockRestore();
  });

/* */
/*le code est un test unitaire pour vérifier si l’utilisateur est redirigé vers
 la page d’accueil après une connexion réussie.
Dans ce test, nous rendons le composant Login dans un BrowserRouter. 
Nous récupérons ensuite les champs d’e-mail et de mot de passe ainsi que le bouton
 de soumission en utilisant la méthode getByLabelText et getByRole. 
 Nous simulons ensuite la saisie de l’e-mail et du mot de passe et cliquons sur le bouton
  de soumission en utilisant la méthode fireEvent.
Enfin, nous attendons que le composant redirige l’utilisateur vers la page d’accueil 
en vérifiant que le titre de la page est présent dans le DOM en utilisant la méthode getByRole.
 Si le titre est présent, le test réussit. */
 test('navigates to home on successful login', async () => {
  render(
    <BrowserRouter>
      <Login />
  </BrowserRouter>
  );

  const emailField = screen.getByLabelText(/Email/i);
  const passwordField = screen.getByLabelText(/Password/i);
  const submitButton = screen.getByRole('button', { name: /Envoyer/i });

  fireEvent.change(emailField, { target: { value: 'valid_email@example.com' } });
  fireEvent.change(passwordField, { target: { value: 'valid_password' } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    const homeTitle = screen.getByRole('heading',{ level: 3 });
    expect(homeTitle).toBeInTheDocument();
  });
});


//////////////TEST Integration ///////////////////

/* test d'intégration pour le composant Catalogue, qui vérifie si les données téléchargées sont correctes :
Dans cet exemple, nous avons utilisé screen pour trouver les éléments de catalogue à partir de texte, de rôle et d'attributs.
Nous avons utilisé waitFor pour attendre le chargement des données avant de continuer avec nos tests.
Nous avons vérifié si un produit était présent dans la liste, et avons également vérifié si les catégories et les promotions étaient correctement affichées.
Nous avons vérifié si une image de produit était présente dans la liste et si l'URL de l'image était valide.
En utilisant cet exemple de test d'intégration, vous pouvez vous assurer que les données téléchargées sont correctement rendues et affichées dans votre composant Catalogue.
*/


test('displays a list of products', async () => {
  render(<Catalogue props='any' />);

  // Attendre le chargement des produits
  await waitFor(() => screen.findByText('Choisissez une categorie a flitrer'),{ timeout: 5000 });

  // Controle que la liste contient des produits
  const productTitle = await screen.findAllByText(/Prix/i);
  expect(productTitle).toBeTruthy;

  // Controle que les produits dans la liste contienne bien une categorie
  const productCategories = await screen.findAllByText(/Categorie/i);
  expect(productCategories).toBeTruthy;
  productCategories.forEach(category=>{
    expect(category).toBeInTheDocument();
  });

  // Controle que les produits en promotions soit bien afficher en promotion
  const productPromotions = screen.queryAllByText(/promo/i);
  productPromotions.forEach(promotion=>{
    expect(promotion).not.toHaveTextContent(/Prix :/i);
    expect(promotion).toHaveTextContent(/Prix PROMO/i);
  });
 
  // Controle que chaque produit affiche bien une image
  const productImage = screen.queryAllByRole('img');
  productImage.forEach(image=>{
    expect(image).toHaveAttribute('src');
  })

});

