import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Box } from '@/components/ui/box'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

type VerifyResult = 'valid' | 'invalid' | null

function simulateVerifyUSI(usi: string): Promise<VerifyResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(usi.trim() === '123ABC' ? 'valid' : 'invalid')
    }, 1200)
  })
}

export function LearnerOnboardingUSI() {
  const [usiValue, setUsiValue] = useState('AB1234567890')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<VerifyResult>(null)

  async function handleVerify() {
    setResult(null)
    setLoading(true)
    const outcome = await simulateVerifyUSI(usiValue)
    setLoading(false)
    setResult(outcome)
  }

  return (
    <div className="usi-page">
      <div className="usi-widget">

        {/* Header */}
        <div className="usi-widget-header">
          <div className="usi-widget-header-top">
            <div className="usi-avatar-circle">
              <i className="icon-contact-add-outline" />
            </div>
            <h2 className="usi-widget-title">Unique Student Identifier (USI)</h2>
          </div>
          <Separator />
        </div>

        {/* Body */}
        <div className="usi-widget-body">

          {/* Info block */}
          <div className="usi-info-block">
            <i className="icon-info-outline usi-info-icon" />
            <div className="usi-info-content">
              <p className="usi-info-title">Your Unique Student Identifier</p>
              <div className="usi-info-text">
                <p>
                  If you do not have a Unique Student Identifier (USI), your training provider can be
                  prevented from issuing you with a nationally recognised qualification or statement of
                  attainment when you complete your course.
                </p>
                <p>
                  If you have not yet obtained a USI you can apply for it directly at{' '}
                  <a href="https://www.usi.gov.au/your-usi/create-usi" target="_blank" rel="noreferrer">
                    https://www.usi.gov.au/your-usi/create-usi
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div>
            <p className="usi-instructions-text">
              To verify your USI, your personal details must match your USI record. Please make sure
              the following information are entered exactly as they appear on your USI:
            </p>
            <ul className="usi-instructions-list">
              <li>First name</li>
              <li>Surname</li>
              <li>Date of birth</li>
            </ul>
          </div>

          {/* Input + button row */}
          <div className="usi-field-row">
            <Box direction="col" gap="050" className="usi-field-group">
              <Label htmlFor="usi-input">Unique Student Identifier (USI)</Label>
              <Input
                id="usi-input"
                value={usiValue}
                onChange={(e) => {
                  setUsiValue(e.target.value)
                  setResult(null)
                }}
              />
            </Box>
            <Button variant="outline" loading={loading} onClick={handleVerify}>
              Verify USI
            </Button>
          </div>

          {/* Verification result */}
          {result === 'valid' && (
            <Alert variant="positive">
              <AlertTitle>USI verified</AlertTitle>
              <AlertDescription>Your Unique Student Identifier has been successfully verified.</AlertDescription>
            </Alert>
          )}
          {result === 'invalid' && (
            <Alert variant="destructive">
              <AlertTitle>USI could not be verified</AlertTitle>
              <AlertDescription>The USI you entered does not match our records. Please check your details and try again.</AlertDescription>
            </Alert>
          )}

        </div>
      </div>
    </div>
  )
}
