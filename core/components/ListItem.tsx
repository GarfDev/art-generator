/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useRef } from 'react'
import styled from 'styled-components'
import { useDrag, useDrop } from 'react-dnd'

import { Layer } from '../types'

interface Props {
  layer: Layer
  index: number
  moveListItem: (dragIndex: number, hoverIndex: number) => void
  onLayerChange: (layer: Layer) => void
}

export const ListItem = ({
  layer,
  index,
  moveListItem,
  onLayerChange,
}: Props): JSX.Element => {
  // useDrag - the list item is draggable
  const [draggable, setDraggable] = React.useState(false)

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    canDrag: draggable,
    item: { index, ...layer },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  // useDrop - the list item is also a drop area
  const [spec, dropRef] = useDrop({
    accept: 'item',
    hover: (item: any, monitor) => {
      const dragIndex = item.index
      const hoverIndex = index
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

      // if dragging down, continue only when hover is smaller than middle Y
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
      // if dragging up, continue only when hover is bigger than middle Y
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

      moveListItem(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  // Join the 2 refs together into one (both draggable and can be dropped on)
  const ref = useRef(null)
  const dragDropRef = dragRef(dropRef(ref))

  // Make items being dragged transparent, so it's easier to see where we drop them
  const opacity = isDragging ? 0 : 1
  return (
    <Container ref={dragDropRef as any} style={{ opacity }}>
      <Name
        onMouseEnter={() => setDraggable(true)}
        onMouseLeave={() => setDraggable(false)}
      >
        {layer.name}
      </Name>
      <input
        type="range"
        min={0}
        max={1}
        step={0.1}
        onChange={(e) => {
          onLayerChange({
            ...layer,
            options: {
              ...layer.options,
              opacity: parseFloat(e.target.value),
            },
          })
        }}
        value={layer.options.opacity}
      ></input>
    </Container>
  )
}

const Name = styled.span`
  margin-right: 5px;
`

const Container = styled.div`
  display: flex;
  align-items: center;
`
