export default {
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "slug",
      title: "Slug",
      type: "string",
    },
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "rating",
      title: "Rating",
      type: "number",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "contents",
      title: "Contents",
      type: "string",
    },
  ],
};
