async function fetchBlogData() {
    try {
        const response = await fetch('https://coding-week-2024-api.onrender.com/api/data'); 
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const data = await fetchBlogData();
    makeNewBlogs(data);
});

function f(blog, index) {
    if (index === 0) {
        return `<p>Journalist: ${blog.author}</p><p>${blog.type}</p>`;
    } else {
        return ' ';
    }
}

//function to take the data and create blogs
function makeNewBlogs(data) {

    data.forEach((blog, index) => {
        const elem = document.createElement('div');
        elem.className = 'blog';
        elem.addEventListener('mouseover',()=>{
            elem.style.backgroundColor = 'grey';
            elem.style.color = 'white';
        })
        elem.addEventListener('mouseout',()=>{
            elem.style.backgroundColor = '';
            elem.style.color = '';
        })
        elem.innerHTML = `
            <img src="${blog.image}" alt="${blog.headline}" >
            <h2>${blog.headline}</h2>
            <p>Date: ${new Date(blog.date).toLocaleDateString()}</p>
            ${f(blog, index)}
        `;
        elem.addEventListener('click', () => ifClicked(blog));

        if (index === 0) {
            document.getElementById('featured').appendChild(elem);
        } else {
            document.getElementById('sidebar').appendChild(elem);
        }
    });
}

//function to show box if clicked
function ifClicked(blog) {
    const blogBox = document.getElementById('blogBox');
    blogBox.innerHTML = `
        <h2>${blog.headline}</h2>
        <p>Date:${new Date(blog.date).toLocaleDateString()}</p>
        <p>Journalist:${blog.author}</p>
        <img src="${blog.image}" alt="${blog.headline}">
        <p>${blog.content}</p>
    `;
    blogBox.style.display = 'block';
    blogBox.addEventListener('click', () => blogBox.style.display = 'none');
}
