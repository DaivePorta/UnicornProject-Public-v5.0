Public Class CCPercepcion
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function ListarPercepciones(ByVal p_FAB_CODE As String, ByVal p_DEL As String, ByVal p_AL As String, ByVal p_ESTADO_IND As String, ByVal p_CTLG_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_LISTAR_PERCEPCIONES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FAB_CODE", p_FAB_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DEL", p_DEL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_AL", p_AL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
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
    'Registra el cobro parcial o total de una percepcion
    Public Function CrearCobroPercepcion(ByVal p_FABFACC_CODE As String, ByVal p_FECHA_PAGO As String, ByVal p_INTERES As String, ByVal p_MONTO As String,
                                          ByVal p_FOPA As String, ByVal p_NRO_CHEQUE As String, ByVal p_NRO_CUENTA_DEST As String,
                                          ByVal p_NRO_CUENTA_ORI As String, ByVal p_NRO_OPERACION As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_CREAR_COBRO_PERCEPCION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FABFACC_CODE", p_FABFACC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_PAGO", p_FECHA_PAGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_INTERES", p_INTERES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_MONTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FOPA", p_FOPA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_CHEQUE", p_NRO_CHEQUE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_CUENTA_DEST", p_NRO_CUENTA_DEST, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_CUENTA_ORI", p_NRO_CUENTA_ORI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_OPERACION", p_NRO_OPERACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_PAGO", String.Empty, ParameterDirection.Output, 253))
            cmd = cn.Ejecuta_parms(cmd)

            msg(0) = cmd.Parameters("@p_CODE_PAGO").Value
            msg(1) = "OK"

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    'Actualiza estado a 'C' (COBRADO) y documento de pago de Percepcion
    Public Function RegistraCobroRegistro(ByVal p_FAB_CODE As String, ByVal p_CODE_PAGO As String) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_REGISTRA_COBRO_REGISTRO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FAB_CODE", p_FAB_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_PAGO", p_CODE_PAGO, ParameterDirection.Input, 253))

            cmd = cn.Ejecuta_parms(cmd)
            Return "OK"

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    'Listar cobros percepcion
    Public Function ListarCobrosPercepcion(ByVal p_FABFACC_CODE As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_LISTAR_COBROS_PERCEPCION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FABFACC_CODE", p_FABFACC_CODE, ParameterDirection.Input, 253))
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

    Public Function ListarFormasPago(ByVal p_FOPA_CODE As String, ByVal p_MOSTRAR_CAJA_IND As String, ByVal p_TIPO_FOPA_IND As String, ByVal p_ESTADO_IND As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTAR_TIPO_PAGO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_FOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_SUNAT", String.Empty, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO_IND, ParameterDirection.Input, 253))
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
End Class
