import { supabase } from './supabase'
import { Product } from '@/types'

export async function getProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')

    if (error) {
      console.error('Error fetching products:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Unexpected error:', error)
    return []
  }
}

