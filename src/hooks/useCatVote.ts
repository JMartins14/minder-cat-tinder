import { useState } from 'react';
import { VoteRequest, VoteResponse } from '../types';
import { voteCat } from '../services/api';

export const useCatVote = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const vote = async (voteData: VoteRequest): Promise<VoteResponse | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await voteCat(voteData);
      return response;
    } catch (e) {
      setError('Failed to vote');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const likeCat = (image_id: string, sub_id?: string) => {
    return vote({ image_id, sub_id, value: 1 });
  };

  const dislikeCat = (image_id: string, sub_id?: string) => {
    return vote({ image_id, sub_id, value: 0 });
  };

  return {
    likeCat,
    dislikeCat,
    loading,
    error,
  };
};
