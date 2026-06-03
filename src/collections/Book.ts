import type { CollectionConfig } from 'payload'

// bok schema for Payload CMS, alle felter som trengs for å lage en bok i databasen, og for å kunne redigere den i adminpanelet

export const Books: CollectionConfig = {
  slug: 'books',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'price', 'stock'],
  },
  fields: [
    {
      name: 'id',
      label: 'ID',
      type: 'number',
      required: true,
      unique: true,
    },
    {
      name: 'title',
      label: 'Tittel',
      type: 'text',
      required: true,
    },
    {
      name: 'author',
      label: 'Forfatter',
      type: 'text',
      required: true,
    },
    {
      name: 'price',
      label: 'Pris',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'description',
      label: 'Beskrivelse',
      type: 'textarea',
      required: true,
    },
    {
      name: 'signed',
      label: 'Signert',
      type: 'select',
      required: true,
      options: [
        { label: 'Usignert', value: 'unsigned' },
        { label: 'Signert', value: 'signed' },
      ],
      defaultValue: 'unsigned',
    },
    {
      name: 'binding',
      label: 'Innbinding',
      type: 'select',
      required: true,
      options: [
        { label: 'Pocket', value: 'pocket' },
        { label: 'Innbundet', value: 'hardcover' },
      ],
      defaultValue: 'pocket',
    },
    {
      name: 'language',
      label: 'Språk',
      type: 'text',
      required: true,
    },
    {
      name: 'genre',
      label: 'Sjanger',
      type: 'text',
      required: true,
    },
    {
      name: 'publishedYear',
      label: 'Utgitt år',
      type: 'number',
      required: true,
    },
    {
      name: 'condition',
      label: 'Tilstand',
      type: 'select',
      required: true,
      options: [
        { label: 'Som ny', value: 'som ny' },
        { label: 'Veldig bra', value: 'veldig bra' },
        { label: 'Ok', value: 'ok' },
      ],
    },
    {
      name: 'stock',
      label: 'Antall på lager',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'imageUrl',
      label: 'Bilde URL',
      type: 'text',
      required: true,
    },
    {
      name: 'ageGroup',
      label: 'Aldersgruppe',
      type: 'select',
      required: true,
      options: [
        { label: 'Barn', value: 'barn' },
        { label: 'Voksen', value: 'voksen' },
        { label: 'Ungdom', value: 'ungdom' },
      ],
      defaultValue: 'voksen',
    },
  ],
}
