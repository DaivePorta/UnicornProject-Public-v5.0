Public Class NFModeloUnidad

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
    Public Function ListarModelo(ByVal p_CODE As String, ByVal p_MARC_CODE As String, ByVal p_MODELO As String, ByVal p_ESTADO_IND As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFF_LISTAR_MARCA_MODELO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MARC_CODE", p_MARC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MODELO", p_MODELO, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarModelo(ByVal p_CODE As String, ByVal p_MODELO As String, ByVal p_MARC_CODE As String,
                                     ByVal p_PESO_SECO As String, ByVal p_PESO_BRUTO As String, ByVal p_NRO_ASIENTOS As String,
                                     ByVal p_CARR_CODE As String, ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String,
                                     ByVal p_LARGO As String, ByVal p_ANCHO As String, ByVal p_ALTO As String,
                                     ByVal p_NRO_EJES As String) As Array

        Dim msg(2) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFF_ACTUALIZAR_MARCA_MODELO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MODELO", p_MODELO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MARC_CODE", p_MARC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PESO_SECO", p_PESO_SECO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PESO_BRUTO", p_PESO_BRUTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_ASIENTOS", p_NRO_ASIENTOS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CARR_CODE", p_CARR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LARGO", p_LARGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANCHO", p_ANCHO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALTO", p_ALTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_EJES", p_NRO_EJES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESPUESTA", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = p_CODE
            msg(1) = cmd.Parameters("@p_RESPUESTA").Value

        Catch ex As Exception
            msg(0) = ex.Message
            msg(1) = "ERROR"
        End Try
        Return msg
    End Function

    Public Function CrearModelo(ByVal p_MODELO As String, ByVal p_MARC_CODE As String, ByVal p_PESO_SECO As String,
                                ByVal p_PESO_BRUTO As String, ByVal p_NRO_ASIENTOS As String, ByVal p_CARR_CODE As String,
                                ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String, ByVal p_LARGO As String,
                                ByVal p_ANCHO As String, ByVal p_ALTO As String, ByVal p_NRO_EJES As String) As Array
        Dim msg(2) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFF_CREAR_MARCA_MODELO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_MODELO", p_MODELO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MARC_CODE", p_MARC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PESO_SECO", p_PESO_SECO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PESO_BRUTO", p_PESO_BRUTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_ASIENTOS", p_NRO_ASIENTOS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CARR_CODE", p_CARR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LARGO", p_LARGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANCHO", p_ANCHO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALTO", p_ALTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_EJES", p_NRO_EJES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESPUESTA", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_CODE").Value
            msg(1) = cmd.Parameters("@p_RESPUESTA").Value

        Catch ex As Exception
            msg(0) = ex.Message
            msg(1) = "ERROR"
        End Try
        Return msg
    End Function


    Public Function CambiarEstadoModelo(ByVal p_codigo As String) As String
        Try

            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFF_CAMBIAR_ESTADO_MARCA_MODELO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_ESTADO").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

End Class
