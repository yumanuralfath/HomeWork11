const errorHandler = (err, req, res, next) => {
  console.log(err)

  if (err.name === 'ErrorNotFound') {
    res.status(404).json({ name: err.name, message: err.message })
  } else if (err.code === '23505') {
    res.status(400).json({ message: err.detail })
  } else if (err.name === 'InvalidCredentials') {
    res.status(400).json({ message: 'Wrong email or password' })
  } else if (err.name === 'Unauthenticated') {
    res.status(401).json({ message: 'Unauthenticated' })
  } else if (err.name === 'Unauthorized') {
    res.status(403).json({ message: 'Unauthorized' })
  } else if (err.message === 'Password and confirmPassword are not valid') {
    res.status(400).json({ message: 'Password and confirmPassword are not Valid' })
  } else if (err.message === 'Invalid email format') {
    res.status(400).json({ message: 'Invalid email format' })
  } else {
    res.status(500).json({ message: 'Internals Server Error' })
  }
}

export default errorHandler
