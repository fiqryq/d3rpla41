import cryFace from './emoji/cry-face'
import gift from './emoji/gift'
import happyFace from './emoji/happy-face'
import loveClean from './emoji/love-clean'
import loveFace from './emoji/love-face'
import surprise from './emoji/surprise'
import wowFace from './emoji/wow-face'
import d3if from './emoji/d3if'
import errorFace from './emoji/error-face'

export const errorPage = errorFace
export const defaultPage = d3if
export const particles = [cryFace, gift, happyFace, loveClean, loveFace, surprise, wowFace]
export const random = () => {
  try {
    return particles[Math.floor(Math.random() * particles.length)]
  } catch (err) {
    return defaultPage
  }
}

export default random
