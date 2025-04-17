import React from 'react'
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";


const Home = () => {
  return (
    <div className="p-8">
  <h1 className="text-4xl font-bold text-center mb-8">Welcome to Home</h1>

  <BentoGrid>
    <BentoGridItem
      title="Knowledge Sharing"
      description="We share grants, updates, and resources transparently."
    />
    <BentoGridItem
      title="Impact Driven"
      description="Our platform supports causes that make real-world impact."
    />
    <BentoGridItem
      title="Real-Time Updates"
      description="Stay updated with latest grants and beneficiary outcomes."
    />
    <BentoGridItem
      title="Real-Time Updates"
      description="Stay updated with latest grants and beneficiary outcomes."
    />
    <BentoGridItem
      title="Real-Time Updates"
      description="Stay updated with latest grants and beneficiary outcomes."
    />
  </BentoGrid>
</div>

  )
}

export default Home
