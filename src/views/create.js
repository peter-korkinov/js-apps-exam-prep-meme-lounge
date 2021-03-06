import {html} from '/src/lib.js';
import {createRecord} from "../api/data.js";
import {notify} from "../common/notify.js";


function createPage(ctx) {
    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const title = formData.get('title');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');

        if (title && description && imageUrl) {
            try {
                await createRecord({title, description, imageUrl});
                ctx.page.redirect('/catalog');
            } catch (err) {
                notify('error', err);
            }
        } else {
            notify('error', 'All fields are required!');
        }
    }

    ctx.render(createTemplate(onSubmit));
}

const createTemplate = (onSubmit) => html`
    <section id="create-meme">
        <form id="create-form" @submit=${onSubmit}>
            <div class="container">
                <h1>Create Meme</h1>
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title">
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                <label for="imageUrl">Meme Image</label>
                <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                <input type="submit" class="registerbtn button" value="Create Meme">
            </div>
        </form>
    </section>
`;

export {
    createPage
};