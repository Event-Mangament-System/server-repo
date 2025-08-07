// This file acts as a mock database for our event types and sub-categories.

export const eventData = {
    weddings: {
      id: 'weddings',
      title: 'Wedding Events',
      description: 'Manage all wedding-related event packages, from intimate ceremonies to grand celebrations. Customize sub-events like Haldi, Mehendi, and the main reception.',
      image: 'https://images.unsplash.com/photo-1597986368384-de24a27e784c?auto=format&fit=crop&w=800&q=60',
      subCategories: [
        {
          id: 'w1',
          name: 'Haldi Ceremony',
          description: 'A vibrant and joyful pre-wedding ritual where turmeric paste is applied to the bride and groom. Includes traditional decor and music.',
          price: 50000,
          photo: 'https://images.unsplash.com/photo-1622329994095-4b3b55d4c82c?auto=format&fit=crop&w=800&q=60'
        },
        {
          id: 'w2',
          name: 'Mehendi & Sangeet',
          description: 'An evening of music, dance, and intricate henna art. Includes a DJ, dance floor, and professional Mehendi artists.',
          price: 150000,
          photo: 'https://images.unsplash.com/photo-1619451428362-81766a45e486?auto=format&fit=crop&w=800&q=60'
        },
        {
            id: 'w3',
            name: 'Grand Reception',
            description: 'A formal celebration to host guests after the wedding ceremony. Includes gourmet catering, stage setup, and lighting.',
            price: 450000,
            photo: 'https://images.unsplash.com/photo-1511795409834-ef04bbd51622?auto=format&fit=crop&w=800&q=60'
        }
      ]
    },
    corporate: {
      id: 'corporate',
      title: 'Corporate Parties',
      description: 'From professional product launches and conferences to annual company galas, manage all corporate event packages here.',
      image: 'https://images.unsplash.com/photo-1542626991-a23141142757?auto=format&fit=crop&w=800&q=60',
      subCategories: [
        {
          id: 'c1',
          name: 'Conference Package',
          description: 'Full-day conference support with audio-visual equipment, seating arrangements, and catering services.',
          price: 200000,
          photo: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=60'
        },
        {
            id: 'c2',
            name: 'Annual Gala Dinner',
            description: 'A premium evening event with a formal dinner, awards ceremony setup, and entertainment options.',
            price: 500000,
            photo: 'https://images.unsplash.com/photo-1543632992-0b2c2a99a896?auto=format&fit=crop&w=800&q=60'
        }
      ]
    },
    family: {
      id: 'family',
      title: 'Family Celebrations',
      description: 'Create and manage packages for memorable family events like birthdays, anniversaries, and festive gatherings.',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=60',
      subCategories: [
        {
          id: 'f1',
          name: 'Birthday Party',
          description: 'A fun-filled party package with themed decorations, a cake table, games, and optional entertainment.',
          price: 35000,
          photo: 'https://images.unsplash.com/photo-1560439514-e960a3ef5019?auto=format&fit=crop&w=800&q=60'
        },
        {
            id: 'f2',
            name: 'Anniversary Dinner',
            description: 'An elegant and private dinner setup for celebrating relationship milestones. Includes custom decor and a curated menu.',
            price: 75000,
            photo: 'https://images.unsplash.com/photo-1600626244679-e3e5c145a306?auto=format&fit=crop&w=800&q=60'
        }
      ]
    }
  };