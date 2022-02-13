import axios from 'axios';

export const animateCycle = 
  (elements, animation) => {
    for (const element of elements) {
      document.querySelector(element).classList.add(animation);

      ((curr) => {
        setTimeout(() => {
          document.querySelector(curr).classList.remove(animation);
        }, 250);
      })(element)
    }
  }


export const getCategories = async () => {
  // add error handling
  const res = await axios.get('/api/categories/');
  return await res.data;
}
