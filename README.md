# ReHome
Secondhand furniture marketplace APP for international students
- Team: Recycling

## Technology Stack
- `Next.js` as frontend framework
- `tailwind CSS` for styling
- `shad/cn` as UI libarary

## Link to our style guide

[https://company-269046.frontify.com/document/528064](https://company-269046.frontify.com/document/528064)

## Operation instructions 
Run locally:
```
npm install
```
```
npm run dev
```
You should be able to see the APP running on `localhost:3000`

Production version:

The app is deployed on Vercel: [https://rehome.vercel.app](https://srid-rehome-deployment.vercel.app)
## Limitations:

1. **Backend Mocking**: Uses localStorage to simulate a backend.
2. **Image Upload**: Limited to a single static placeholder image. E.g., no matter the photo you uploaded, the image will be the same.
3. **Item Modification**: Editing item descriptions is currently unsupported.
4. **Listing Navigation Issue**: Clicking a listing redirects to the information page. Publishing again creates a new listing instead of modifying the existing one.
5. **Seller Name Customization**: Unable to customize seller names due to the absence of signup/login functionality.
