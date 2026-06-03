import type { CollectionConfig } from 'payload'

export const Reservations: CollectionConfig = {
  slug: 'reservations',
  admin: {
    useAsTitle: 'email',
  },
  timestamps: true,
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'items',
      type: 'json',
      required: true,
    },
    {
      name: 'totalItems',
      type: 'number',
      required: true,
    },
    {
      name: 'totalPrice',
      type: 'number',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'underbehandling',
      options: [
        {
          label: 'Under behandling',
          value: 'underbehandling',
        },
        {
          label: 'Utlevert',
          value: 'utlevert',
        },
      ],
    },
    {
      name: 'dato',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
    },
  ],
}
