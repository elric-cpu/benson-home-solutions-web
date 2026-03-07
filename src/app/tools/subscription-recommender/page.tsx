import { Metadata } from 'next';
import { SubscriptionRecommender } from './SubscriptionRecommender';

export const metadata: Metadata = {
  title: 'Maintenance Subscription Recommender | Benson Home Solutions',
  description: 'Get a personalized property maintenance plan using our AI-powered recommendation engine.',
};

export default function SubscriptionRecommenderPage() {
  return (
    <main className="min-h-screen">
      <SubscriptionRecommender />
    </main>
  );
}
