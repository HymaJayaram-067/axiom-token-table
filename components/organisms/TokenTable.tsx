'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/hooks/redux'
import { setSorting } from '@/lib/store/tokensSlice'
import { Token, SortField } from '@/lib/types/token'
import { TokenColumn } from '@/components/molecules/TokenColumn'
import { TokenDetailsModal } from '@/components/molecules/TokenDetailsModal'
import { TableSkeleton } from '@/components/atoms/LoadingSkeleton'

export function TokenTable() {
  const dispatch = useAppDispatch()
  const { tokens, loading, sortField, sortDirection } = useAppSelector((state) => state.tokens)
  const [selectedToken, setSelectedToken] = useState<Token | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const newPairTokens = tokens.filter((t) => t.category === 'new')
  const finalStretchTokens = tokens.filter((t) => t.category === 'final-stretch')
  const migratedTokens = tokens.filter((t) => t.category === 'migrated')

  const handleSort = useCallback(
    (field: SortField) => {
      const newDirection = sortField === field && sortDirection === 'desc' ? 'asc' : 'desc'
      dispatch(setSorting({ field, direction: newDirection }))
    },
    [sortField, sortDirection, dispatch]
  )

  const handleTokenClick = useCallback((token: Token) => {
    setSelectedToken(token)
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    // Delay clearing the token to avoid flashing during modal close animation
    setTimeout(() => setSelectedToken(null), 200)
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <TableSkeleton />
        <TableSkeleton />
        <TableSkeleton />
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <TokenColumn
          title="New Pairs"
          tokens={newPairTokens}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onTokenClick={handleTokenClick}
        />
        <TokenColumn
          title="Final Stretch"
          tokens={finalStretchTokens}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onTokenClick={handleTokenClick}
        />
        <TokenColumn
          title="Migrated"
          tokens={migratedTokens}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onTokenClick={handleTokenClick}
        />
      </div>

      <TokenDetailsModal
        token={selectedToken}
        open={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}
