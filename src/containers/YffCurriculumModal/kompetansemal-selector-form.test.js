import { render, screen } from '@testing-library/react'
import KompetansemalSelectorForm from './kompetansemal-selector-form'
import ba from '../../mocks/ba.json'
import userEvent from '@testing-library/user-event'
const kompetansemaal = ba.data.trinn[0].programomraader[0].maal
const referanse = {
  referanseID: '123',
  referanseTittel: 'Fin, fake tittel'
}

describe('Tester KompetansemalSelectorForm', () => {
  test('komponenten vises IKKE uten å ha mål å vise', () => {
    const { container } = render(<KompetansemalSelectorForm />)
    expect(container).toBeEmptyDOMElement()
  })

  test('komponenten VISES dersom den mottar kompetansemål', () => {
    render(<KompetansemalSelectorForm kompetansemaal={kompetansemaal} referanse={referanse} />)
    expect(screen.getByText(/velg kompetansemål/i)).toBeInTheDocument()
  })

  test('komponenten ekspanderes dersom man klikker', () => {
    render(<KompetansemalSelectorForm kompetansemaal={kompetansemaal} referanse={referanse} />)
    expect(screen.getByText(/velg kompetansemål/i)).toBeInTheDocument()
    userEvent.click(screen.getByText(/velg kompetansemål/i))
    expect(screen.getByText(/foreta masseberegninger/i)).toBeInTheDocument()
    expect(screen.getByText(/utføre enkle betongarbeider/i)).toBeInTheDocument()
  })

  test('man kan klikke på items for å velge de og avvelge', async () => {
    render(<KompetansemalSelectorForm kompetansemaal={kompetansemaal} referanse={referanse} />)
    userEvent.click(screen.getByText(/velg kompetansemål/i))
    expect(screen.getByText(/foreta masseberegninger/i)).toBeInTheDocument()
    const knapp = screen.getByLabelText(/foreta masseberegninger/i)
    userEvent.click(knapp)
    expect(knapp.checked).toEqual(true)
    userEvent.click(knapp)
    expect(knapp.checked).toEqual(false)
  })

  test('man velger mål og arbeidsoppgaver dukker opp', async () => {
    render(<KompetansemalSelectorForm kompetansemaal={kompetansemaal} referanse={referanse} />)
    userEvent.click(screen.getByText(/velg kompetansemål/i))
    expect(screen.getByText(/foreta masseberegninger/i)).toBeInTheDocument()
    expect(await screen.queryByText(/beskriv arbeidsoppgaver/i)).not.toBeInTheDocument()
    expect(await screen.queryByText(/lagre kompetansemål i lokal læreplan/i)).not.toBeInTheDocument()
    const knapp = screen.getByText(/foreta masseberegninger/i)
    userEvent.click(knapp)
    expect(screen.getByText(/beskriv arbeidsoppgaver/i)).toBeInTheDocument()
    expect(screen.getByText(/lagre kompetansemål i lokal læreplan/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/foreta masseberegninger/i)).toBeInTheDocument()
    const field = screen.getByPlaceholderText(/foreta masseberegninger/i)
    userEvent.type(field, 'mye fine ting')
    expect(field.value).toBe('mye fine ting')
  })
})
